from PIL import Image, ImageDraw, ImageFont, ImageOps
import os

OUT = os.path.dirname(os.path.abspath(__file__))
W, H = 1600, 838
DARK = (16, 16, 19)
CARD = (28, 28, 33)
FG = (244, 244, 245)
SUBTLE = (161, 161, 170)
FAINT = (113, 113, 122)
ACCENT = (143, 201, 214)
ACCENT_D = (42, 109, 127)
LINK = (168, 220, 232)
L_BG = (250, 250, 250)
L_FG = (24, 24, 27)
L_SUB = (82, 82, 91)

MENLO = '/System/Library/Fonts/Menlo.ttc'
def F(size, bold=False):
    try:
        return ImageFont.truetype(MENLO, size, index=1 if bold else 0)
    except Exception:
        return ImageFont.truetype(MENLO, size)

def avatar(size, center=(0.5, 0.42)):
    av = Image.open('static/images/antonio-ventilii.jpg')
    s = min(av.size)
    av = ImageOps.fit(av, (s, s), centering=center).resize((size, size), Image.LANCZOS)
    m = Image.new('L', (size*4, size*4), 0)
    ImageDraw.Draw(m).ellipse([0, 0, size*4, size*4], fill=255)
    return av, m.resize((size, size), Image.LANCZOS)

def base(bg=DARK):
    img = Image.new('RGB', (W, H), bg)
    return img, ImageDraw.Draw(img, 'RGBA')

def put_avatar(img, d, x, y, size, ring=ACCENT, ring_w=4, pad=8):
    av, m = avatar(size)
    if ring:
        d.ellipse([x-pad, y-pad, x+size+pad, y+size+pad], outline=ring+(255,), width=ring_w)
    img.paste(av, (x, y), m)

def text_stack(d, tx, name_y, fg=FG, acc=ACCENT, sub=SUBTLE, faint=FAINT, rule=False):
    d.text((tx, name_y), 'Antonio Ventilii', font=F(76, True), fill=fg)
    y = name_y + 108
    if rule:
        d.rectangle([tx+4, y, tx+340, y+4], fill=acc+(255,)); y += 33
    d.text((tx, y), 'AI-Native Senior', font=F(44), fill=acc)
    d.text((tx, y+57), 'Software Engineer', font=F(44), fill=acc)
    d.text((tx, y+147), 'TypeScript · Rust · AI Agents · Web3', font=F(34), fill=sub)
    d.text((tx, y+197), 'ventilii.dev', font=F(34), fill=faint)

# 1 — minimal + glow + rule
img, d = base()
glow = Image.new('L', (W, H), 0); gd = ImageDraw.Draw(glow)
for r in range(520, 0, -4):
    gd.ellipse([350-r, 419-r, 350+r, 419+r], fill=int(18*(1-r/520)))
img.paste(Image.new('RGB', (W, H), ACCENT), (0, 0), glow)
d = ImageDraw.Draw(img, 'RGBA')
put_avatar(img, d, 150, 219, 400)
text_stack(d, 660, 280, rule=True)
img.save(f'{OUT}/og-opt-01.jpg', quality=90)

# 2 — flat minimal, nothing but type + avatar
img, d = base()
put_avatar(img, d, 150, 219, 400)
text_stack(d, 660, 280)
img.save(f'{OUT}/og-opt-02.jpg', quality=90)

# 3 — terminal session
img, d = base()
d.rounded_rectangle([90, 100, W-90, H-100], radius=24, fill=CARD+(255,), outline=(63,63,70,255), width=2)
for i, c in enumerate([(255,95,87),(254,188,46),(40,200,64)]):
    d.ellipse([140+i*44, 148, 168+i*44, 176], fill=c)
mono = F(38); y = 240; x = 150
def line(parts, yy):
    xx = x
    for txt, col in parts:
        d.text((xx, yy), txt, font=mono, fill=col)
        xx += mono.getlength(txt)
line([('~ ❯ ', ACCENT), ('whoami', FG)], y)
line([('Antonio Ventilii — AI-Native Senior Software Engineer', SUBTLE)], y+62)
line([('~ ❯ ', ACCENT), ('cat stack.txt', FG)], y+155)
line([('TypeScript · Rust · AI Agents · Web3', SUBTLE)], y+217)
line([('~ ❯ ', ACCENT), ('open ', FG), ('https://ventilii.dev', LINK)], y+310)
d.rectangle([x+mono.getlength('~ ❯ open https://ventilii.dev ')+2, y+315, x+mono.getlength('~ ❯ open https://ventilii.dev ')+24, y+352], fill=ACCENT+(255,))
put_avatar(img, d, W-330, 520, 170, ring_w=3, pad=6)
img.save(f'{OUT}/og-opt-03.jpg', quality=90)

# 4 — TS object literal
img, d = base()
mono = F(40); y = 200; x = 130
def cline(parts, yy):
    xx = x
    for txt, col in parts:
        d.text((xx, yy), txt, font=mono, fill=col)
        xx += mono.getlength(txt)
cline([('const ', ACCENT), ('antonio', FG), (' = {', SUBTLE)], y)
cline([('  role', LINK), (': ', SUBTLE), ("'AI-Native Senior", (188,224,232)) ], y+70)
cline([("         Software Engineer'", (188,224,232)), (',', SUBTLE)], y+130)
cline([('  stack', LINK), (': [', SUBTLE), ("'TS'", (188,224,232)), (', ', SUBTLE), ("'Rust'", (188,224,232)), (', ', SUBTLE), ("'AI Agents'", (188,224,232)), (', ', SUBTLE), ("'Web3'", (188,224,232)), ('],', SUBTLE)], y+200)
cline([('  site', LINK), (': ', SUBTLE), ("'ventilii.dev'", (188,224,232))], y+270)
cline([('};', SUBTLE)], y+340)
put_avatar(img, d, 1290, 140, 230, ring_w=4)
img.save(f'{OUT}/og-opt-04.jpg', quality=90)

# 5 — light theme
img, d = base(L_BG)
put_avatar(img, d, 150, 219, 400, ring=ACCENT_D)
text_stack(d, 660, 280, fg=L_FG, acc=ACCENT_D, sub=L_SUB, faint=(113,113,122), rule=True)
img.save(f'{OUT}/og-opt-05.jpg', quality=90)

# 6 — accent split panel
img, d = base()
d.rectangle([0, 0, 500, H], fill=ACCENT_D+(255,))
put_avatar(img, d, 300, 219, 400, ring=(255,255,255), ring_w=5)
text_stack(d, 810, 280)
img.save(f'{OUT}/og-opt-06.jpg', quality=90)

# 7 — giant monogram
img, d = base()
d.text((900, 40), 'AV', font=F(760, True), fill=(30, 30, 36))
put_avatar(img, d, 150, 219, 400)
text_stack(d, 660, 280, rule=True)
img.save(f'{OUT}/og-opt-07.jpg', quality=90)

# 8 — blueprint grid
img, d = base()
for gx in range(0, W, 64):
    d.line([(gx, 0), (gx, H)], fill=ACCENT+(14,), width=1)
for gy in range(0, H, 64):
    d.line([(0, gy), (W, gy)], fill=ACCENT+(14,), width=1)
put_avatar(img, d, 150, 219, 400)
text_stack(d, 660, 280, rule=True)
img.save(f'{OUT}/og-opt-08.jpg', quality=90)

# 9 — duotone photo full-height right
img, d = base()
av = Image.open('static/images/antonio-ventilii.jpg')
s = min(av.size)
av = ImageOps.fit(av, (s, s), centering=(0.5, 0.42)).resize((H, H), Image.LANCZOS)
duo = ImageOps.colorize(ImageOps.grayscale(av), black=(10, 20, 24), white=(188, 224, 232))
fade = Image.new('L', (H, H), 255)
fd = ImageDraw.Draw(fade)
for i in range(420):
    fd.line([(i, 0), (i, H)], fill=int(255*i/420))
img.paste(duo, (W-H, 0), fade)
d = ImageDraw.Draw(img, 'RGBA')
text_stack(d, 130, 280, rule=True)
img.save(f'{OUT}/og-opt-09.jpg', quality=90)

# 10 — curly braces, centered
img, d = base()
d.text((110, 120), '{', font=F(560), fill=ACCENT+(90,))
d.text((W-330, 120), '}', font=F(560), fill=ACCENT+(90,))
av_s = 210
put_avatar(img, d, (W-av_s)//2, 110, av_s, ring_w=4, pad=7)
nf = F(72, True)
name = 'Antonio Ventilii'
d.text(((W-nf.getlength(name))//2, 390), name, font=nf, fill=FG)
tf = F(42)
t = 'AI-Native Senior Software Engineer'
d.text(((W-tf.getlength(t))//2, 505), t, font=tf, fill=ACCENT)
sf = F(32)
s1 = 'TypeScript · Rust · AI Agents · Web3'
d.text(((W-sf.getlength(s1))//2, 590), s1, font=sf, fill=SUBTLE)
s2 = 'ventilii.dev'
d.text(((W-sf.getlength(s2))//2, 645), s2, font=sf, fill=FAINT)
img.save(f'{OUT}/og-opt-10.jpg', quality=90)

# contact sheet 2x5, numbered
names = ['1 minimal + glow', '2 flat minimal', '3 terminal', '4 code literal', '5 light theme',
         '6 accent split', '7 monogram', '8 blueprint grid', '9 duotone photo', '10 braces']
TW, TH, LBL = 760, 398, 56
sheet = Image.new('RGB', (TW*2+60, (TH+LBL)*5+120), (5, 5, 7))
sd = ImageDraw.Draw(sheet)
lf = F(30, True)
for i in range(10):
    th = Image.open(f'{OUT}/og-opt-{i+1:02d}.jpg').resize((TW, TH), Image.LANCZOS)
    col, row = i % 2, i // 2
    x, y = 20 + col*(TW+20), 20 + row*(TH+LBL+20)
    sheet.paste(th, (x, y))
    sd.text((x+8, y+TH+10), names[i], font=lf, fill=(244, 244, 245))
sheet.save(f'{OUT}/og-sheet.jpg', quality=85)
print('done')
