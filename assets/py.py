
# pip install yt-dlp

import os
import yt_dlp

URL = input("YouTube URL: ").strip()

# Папка, где находится сам скрипт
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


def download_video():
    ydl_opts = {
        "format": "bestvideo+bestaudio/best",
        "outtmpl": os.path.join(SCRIPT_DIR, "background.%(ext)s"),
        "merge_output_format": "mp4",
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([URL])


def download_audio():
    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": os.path.join(SCRIPT_DIR, "background_music.%(ext)s"),
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([URL])


print("\n1 - Скачать видео")
print("2 - Скачать звук")

choice = input("Выбор: ").strip()

if choice == "1":
    download_video()
elif choice == "2":
    download_audio()
else:
    print("Неверный выбор")