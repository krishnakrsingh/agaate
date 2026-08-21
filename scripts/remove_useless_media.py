import os

MEDIA_DIR = r"c:\Users\krish\Downloads\agaate\all images and shit"

# 1. Patterns of files to delete across the folder
useless_patterns = [
    "-001",
    "A2 Ghee_.mp4",
    "New Nursery Ankit Sir(1).mp4",
    "Timeline ",
    "WhatsApp Video "
]

# 2. Specific redundant / duplicate takes
duplicate_files = [
    os.path.join(MEDIA_DIR, "A2 Ghee1.mp4"),
    os.path.join(MEDIA_DIR, "A2 Ghee2.mp4"),
    os.path.join(MEDIA_DIR, "A2 Ghee3.mp4"),
    os.path.join(MEDIA_DIR, "Pending Reels", "Watermelon_.mp4"),
    os.path.join(MEDIA_DIR, "Pending Reels", "Farmers testimonial 5.mp4"),
    os.path.join(MEDIA_DIR, "Pending Reels", "Koppert testimonial Part 1.mp4"),
    os.path.join(MEDIA_DIR, "Pending Reels", "PI Ankit Sir Part 2.mp4"),
    os.path.join(MEDIA_DIR, "Pending Reels", "Agaate T Stanes Sammelan.mp4"),
    os.path.join(MEDIA_DIR, "Kisaan Mall", "Agaate Mall Speeches Short.mp4"),
    os.path.join(MEDIA_DIR, "Kisaan Mall", "Gaurav Netafim Byte.mp4"),
    os.path.join(MEDIA_DIR, "Kisaan Mall", "Gaurav Netafim Byte Reel ABOUT DRIP IRRIGATION.mp4"),
    os.path.join(MEDIA_DIR, "Only For Youtube", "Abhay Introduction For youtube.mp4"),
    os.path.join(MEDIA_DIR, "Only For Youtube", "Agaate Brand Film 4K For youtube.mp4"),
    os.path.join(MEDIA_DIR, "Only For Youtube", "Drip irrigation Full Landscape For Youtube.mp4"),
    os.path.join(MEDIA_DIR, "Only For Youtube", "First Look at the Farms For Youtube.mp4")
]

deleted_count = 0
deleted_bytes = 0

print("=== REMOVING USELESS & DUPLICATE MEDIA FILES ===")

# Delete pattern matches
for root, dirs, files in os.walk(MEDIA_DIR):
    for f in files:
        fp = os.path.join(root, f)
        if any(p in f for p in useless_patterns):
            if os.path.exists(fp):
                sz = os.path.getsize(fp)
                deleted_bytes += sz
                deleted_count += 1
                os.remove(fp)
                print(f"[DELETED] {f} ({sz / (1024*1024):.1f} MB)")

# Delete specific duplicates
for fp in duplicate_files:
    if os.path.exists(fp):
        sz = os.path.getsize(fp)
        deleted_bytes += sz
        deleted_count += 1
        os.remove(fp)
        print(f"[DELETED DUPLICATE] {os.path.basename(fp)} ({sz / (1024*1024):.1f} MB)")

print(f"\n[SUMMARY] Successfully removed {deleted_count} useless/duplicate files!")
print(f"[RECLAIMED DISK SPACE] {deleted_bytes / (1024**3):.2f} GB ({deleted_bytes / (1024*1024):.1f} MB)")
