from PIL import Image, ImageDraw, ImageFont, ImageOps

W, H = 1600, 838
BG = (16, 16, 19)
FG = (244, 244, 245)
SUBTLE = (161, 161, 170)
FAINT = (113, 113, 122)
ACCENT = (143, 201, 214)
MENLO = '/System/Library/Fonts/Menlo.ttc'

img = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(img, 'RGBA')

av = Image.open('static/images/antonio-ventilii.jpg')
s = min(av.size)
av = ImageOps.fit(av, (s, s), centering=(0.5, 0.42))
AV = 400
av = av.resize((AV, AV), Image.LANCZOS)
m = Image.new('L', (AV*4, AV*4), 0)
ImageDraw.Draw(m).ellipse([0, 0, AV*4, AV*4], fill=255)
m = m.resize((AV, AV), Image.LANCZOS)
ax, ay = 150, (H - AV)//2
d.ellipse([ax-8, ay-8, ax+AV+8, ay+AV+8], outline=ACCENT+(255,), width=4)
img.paste(av, (ax, ay), m)

f_name = ImageFont.truetype(MENLO, 76, index=1)
f_title = ImageFont.truetype(MENLO, 44)
f_sub = ImageFont.truetype(MENLO, 32)

tx = 650
d.text((tx, 280), 'Antonio Ventilii', font=f_name, fill=FG)
d.text((tx, 421), 'AI-Native Senior', font=f_title, fill=ACCENT)
d.text((tx, 478), 'Software Engineer', font=f_title, fill=ACCENT)
stack = 'TypeScript · Rust · Python · AI Agents · Web3'
d.text((tx, 568), stack, font=f_sub, fill=SUBTLE)
print('stack ends at', tx + f_sub.getlength(stack))
d.text((tx, 618), 'ventilii.dev', font=f_sub, fill=FAINT)

img.save('static/images/og-banner.jpg', quality=90)
print('saved')
