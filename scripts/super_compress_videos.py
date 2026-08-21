import os
import subprocess
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

PUBLIC_VIDEOS = r"c:\Users\krish\Downloads\agaate\public\videos"

print("=== STARTING ULTRA-HIGH EFFICIENCY VIDEO RE-COMPRESSION ===")

total_before = 0
total_after = 0
processed_count = 0

for root, dirs, files in os.walk(PUBLIC_VIDEOS):
    if "posters" in root:
        continue
    for f in sorted(files):
        if not f.endswith(".mp4"):
            continue

        src_path = os.path.join(root, f)
        temp_path = os.path.join(root, f"temp_{f}")

        sz_before = os.path.getsize(src_path)
        total_before += sz_before

        rel = os.path.relpath(src_path, PUBLIC_VIDEOS)

        # Detect aspect ratio
        is_vertical = "shorts" in root or "partners" in root or f in ["team-agaate.mp4", "agaate-parivar.mp4", "jan-kisaan-sammelan-reel.mp4"]
        
        if is_vertical:
            vf = "scale=480:-2"
            crf = "30"
            ba = "64k"
        else:
            vf = "scale=1280:-2"
            crf = "29"
            ba = "96k"

        cmd = [
            ffmpeg_exe, "-y", "-i", src_path,
            "-vf", vf,
            "-c:v", "libx264", "-preset", "medium", "-crf", crf,
            "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", ba,
            "-movflags", "+faststart",
            temp_path
        ]

        try:
            res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
            sz_after = os.path.getsize(temp_path)

            if sz_after < sz_before:
                os.replace(temp_path, src_path)
                final_sz = sz_after
            else:
                os.remove(temp_path)
                final_sz = sz_before

            total_after += final_sz
            processed_count += 1
            savings = 100 * (1 - final_sz / sz_before) if sz_before > 0 else 0
            print(f"[{processed_count:02d}] {rel:<35} | {sz_before/(1024*1024):.2f} MB -> {final_sz/(1024*1024):.2f} MB (-{savings:.1f}%)")

        except Exception as e:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            total_after += sz_before
            print(f"Error compressing {f}: {e}")

print("\n=== COMPRESSION SUMMARY ===")
print(f"Total Videos Processed: {processed_count}")
print(f"Total Size Before: {total_before / (1024*1024):.1f} MB ({total_before / (1024**3):.2f} GB)")
print(f"Total Size After : {total_after / (1024*1024):.1f} MB ({total_after / (1024**3):.2f} GB)")
print(f"Overall Space Saved: {100 * (1 - total_after / total_before):.1f}%")
