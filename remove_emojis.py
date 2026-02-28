import os
import re

def remove_emojis(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex for standard emojis and symbols
    # This also covers a wide range of unicode blocks where emojis are found
    emoji_pattern = re.compile(
        u"(\ud83d[\ude00-\ude4f])|"  # emoticons
        u"(\ud83c[\udf00-\uffff])|"  # symbols & pictographs (1 of 2)
        u"(\ud83d[\u0000-\uddff])|"  # symbols & pictographs (2 of 2)
        u"(\ud83d[\ude80-\udeff])|"  # transport & map symbols
        u"(\ud83c[\udde0-\uddff])|"  # flags (iOS)
        u"[\u2600-\u26FF]|"          # miscellaneous symbols
        u"[\u2700-\u27BF]|"          # dingbats
        u"[\U0001f600-\U0001f64F]|"  # emoticons
        u"[\U0001f300-\U0001f5FF]|"  # symbols & pictographs
        u"[\U0001f680-\U0001f6FF]|"  # transport & map symbols
        u"[\U0001f1e0-\U0001f1ff]|"  # flags (iOS)
        u"[\U0001f900-\U0001f9FF]|"  # supplemental symbols and pictographs
        u"[\U0001fa70-\U0001faFF]|"  # symbols and pictographs extended-A
        u"[\U00002600-\U000026FF]|"  # miscellaneous symbols
        u"[\U00002700-\U000027BF]|"  # dingbats
        u"\u2B50|\u2139|\u231A|\u231B|\u2328|"  # various specific symbols like star, info, watches, keyboard
        u"[\u23E9-\u23F3]|[\u23F8-\u23FA]|[\u25AA-\u25AB]|"  # playback symbols, squares
        u"[\u25B6-\u25C0]|[\u25FB-\u25FE]|"  # play, reverse, squares
        u"[\u203C-\u2049]|\u2122|\u24C2|[\u2934-\u2935]|[\u2B05-\u2B07]|"  # punctuation, trademark, M, arrows
        u"[\u2B1B-\u2B1C]|[\u3297-\u3299]|"  # squares, japanese symbols
        u"[\u00A9-\u00AE]\uFE0F?|"  # copyright, registered
        u"[\u2122]\uFE0F?|"  # trademark
        u"[\u23F3]\uFE0F?|"  # hourglass
        u"[\u3030-\u303D]\uFE0F?",  # wavy dash, part alternation mark
        flags=re.UNICODE)

    new_content = emoji_pattern.sub(r'', content)
    
    # Remove any left over Variation Selector-16
    new_content = new_content.replace('\ufe0f', '')

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed emojis from {filename}")

def main():
    directory = '.'
    extensions = ('.md', '.ts', '.tsx', '.js', '.jsx', '.css', '.html')
    
    for root, dirs, files in os.walk(directory):
        if '.git' in root or 'node_modules' in root or '.next' in root or '.gemini' in root or '.agents' in root:
            continue
            
        for file in files:
            if file.endswith(extensions):
                filepath = os.path.join(root, file)
                try:
                    remove_emojis(filepath)
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    main()
