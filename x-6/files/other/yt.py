import os
from pytube import YouTube

if not os.path.exists("videos"):
    os.makedirs("videos")

with open("links.txt", "r") as file:
    links = file.readlines()

for link in links:
    try:
        yt = YouTube(link)
        video = yt.streams.get_highest_resolution()

        video_dir = os.path.join("videos")

        video.download(output_path=video_dir)
        print(f"Downloaded video: {yt.title}")
    except Exception as e:
        print(f"Error downloading video: {e}")

print("All videos downloaded successfully.")
