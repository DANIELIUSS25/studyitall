#!/usr/bin/env python3
"""
Generate audio narration for all MDX lessons using edge-tts.

Usage:
    pip install edge-tts
    python scripts/generate-audio.py [--force]

Options:
    --force    Regenerate all audio files, even if they already exist
"""

import asyncio
import os
import re
import sys
import glob

try:
    import edge_tts
except ImportError:
    print("Error: edge-tts not installed. Run: pip install edge-tts")
    sys.exit(1)

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "..", "content")
AUDIO_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
VOICE = "en-US-JennyNeural"


def strip_frontmatter(text: str) -> str:
    """Remove YAML frontmatter between --- delimiters."""
    if text.startswith("---"):
        end = text.find("---", 3)
        if end != -1:
            text = text[end + 3:]
    return text


def strip_markdown(text: str) -> str:
    """Strip markdown syntax to get plain text for TTS."""
    # Remove code blocks
    text = re.sub(r"```[\s\S]*?```", "", text)
    # Remove inline code
    text = re.sub(r"`[^`]+`", "", text)
    # Remove markdown tables
    text = re.sub(r"\|[^\n]+\|", "", text)
    text = re.sub(r"[-|]+\n", "", text)
    # Remove headers (keep text)
    text = re.sub(r"#{1,6}\s+", "", text)
    # Remove bold/italic markers
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    # Remove links (keep text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    # Remove images
    text = re.sub(r"!\[([^\]]*)\]\([^)]+\)", "", text)
    # Remove HTML tags
    text = re.sub(r"<[^>]+>", "", text)
    # Remove list markers
    text = re.sub(r"^\s*[-*+]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+\.\s+", "", text, flags=re.MULTILINE)
    # Clean up whitespace
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = text.strip()
    return text


async def generate_audio(text: str, output_path: str) -> bool:
    """Generate MP3 audio from text using edge-tts."""
    try:
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)
        return True
    except Exception as e:
        print(f"  Error generating audio: {e}")
        return False


async def main():
    force = "--force" in sys.argv

    # Find all MDX files
    mdx_files = sorted(glob.glob(os.path.join(CONTENT_DIR, "*/*.mdx")))

    if not mdx_files:
        print("No MDX files found in content directory.")
        return

    print(f"Found {len(mdx_files)} lessons to process.")
    print(f"Voice: {VOICE}")
    print(f"Force regenerate: {force}")
    print()

    success = 0
    skipped = 0
    failed = 0

    for mdx_path in mdx_files:
        # Determine output path
        relative = os.path.relpath(mdx_path, CONTENT_DIR)
        module_slug = os.path.dirname(relative)
        lesson_slug = os.path.splitext(os.path.basename(relative))[0]

        output_dir = os.path.join(AUDIO_DIR, module_slug)
        output_path = os.path.join(output_dir, f"{lesson_slug}.mp3")

        # Skip if already exists and not forcing
        if os.path.exists(output_path) and not force:
            mdx_mtime = os.path.getmtime(mdx_path)
            mp3_mtime = os.path.getmtime(output_path)
            if mp3_mtime > mdx_mtime:
                print(f"  Skipping (up to date): {module_slug}/{lesson_slug}")
                skipped += 1
                continue

        # Read and process content
        with open(mdx_path, "r") as f:
            raw = f.read()

        text = strip_frontmatter(raw)
        text = strip_markdown(text)

        if len(text.strip()) < 10:
            print(f"  Skipping (no content): {module_slug}/{lesson_slug}")
            skipped += 1
            continue

        # Create output directory
        os.makedirs(output_dir, exist_ok=True)

        # Generate audio
        print(f"  Generating: {module_slug}/{lesson_slug} ({len(text)} chars)")
        if await generate_audio(text, output_path):
            file_size = os.path.getsize(output_path)
            print(f"    -> {output_path} ({file_size // 1024}KB)")
            success += 1
        else:
            failed += 1

    print()
    print(f"Done! Generated: {success}, Skipped: {skipped}, Failed: {failed}")


if __name__ == "__main__":
    asyncio.run(main())
