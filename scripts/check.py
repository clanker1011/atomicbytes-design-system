#!/usr/bin/env python3
"""Independent contrast, asset, document-link, and accessible-field checks."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parent.parent
errors = []

class Document(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.refs, self.labels, self.inputs = path, set(), [], set(), []
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if 'id' in data:
            if data['id'] in self.ids: errors.append(f'{self.path.name}: duplicate ID {data["id"]}')
            self.ids.add(data['id'])
        if tag == 'label' and 'for' in data: self.labels.add(data['for'])
        if tag in ('input', 'textarea', 'select'): self.inputs.append(data)
        for attr in ('src', 'href'):
            if attr in data: self.refs.append(data[attr])
        for attr in ('aria-describedby', 'aria-labelledby'):
            for value in data.get(attr, '').split(): self.refs.append('#' + value)

docs = {path.name: Document(path) for path in ROOT.glob('*.html')}
for name, doc in docs.items():
    for ref in doc.refs:
        parsed = urlsplit(ref)
        if parsed.scheme or parsed.netloc: continue
        target = ROOT / unquote(parsed.path) if parsed.path else doc.path
        if not target.exists(): errors.append(f'{name}: missing local resource {ref}')
        if parsed.fragment and target.suffix == '.html' and parsed.fragment not in docs[target.name].ids:
            errors.append(f'{name}: missing anchor {ref}')
    for field in doc.inputs:
        if field.get('type') in ('checkbox', 'hidden'): continue
        if not (field.get('aria-label') or field.get('aria-labelledby') or field.get('id') in doc.labels):
            errors.append(f'{name}: unlabeled field {field.get("id", field.get("type"))}')
        if field.get('aria-invalid') == 'true' and not field.get('aria-describedby'):
            errors.append(f'{name}: invalid field lacks associated error')

css = (ROOT / 'tokens.css').read_text()
def properties(block): return dict(re.findall(r'(--[\w-]+)\s*:\s*([^;]+);', block))
base = properties(css.split(':root {', 1)[1].split('\n}', 1)[0])
dark = properties(css.split(':root[data-theme="dark"] {', 1)[1].split('\n}', 1)[0])
fallback = properties(css.split(':root:not([data-theme="light"]) {', 1)[1].split('\n  }', 1)[0])
if dark != fallback: errors.append('OS dark preference differs from explicit dark theme')
def resolve(token, values):
    value = values[token].strip()
    if value.startswith('var('): return resolve(re.match(r'var\((--[\w-]+)\)', value)[1], values)
    return value

def luminance(hex):
    values = [int(hex[i:i+2], 16)/255 for i in (1, 3, 5)]
    values = [v/12.92 if v <= .04045 else ((v+.055)/1.055)**2.4 for v in values]
    return sum(v*w for v,w in zip(values, (.2126,.7152,.0722)))

def contrast(a, b):
    a,b = sorted((luminance(a), luminance(b)))
    return (b+.05)/(a+.05)

pairs = []
for surface in ('--surface-page', '--surface-card', '--surface-well'):
    pairs += [(name, surface, 4.5) for name in ('--text-primary','--text-secondary','--text-accent')]
    pairs += [(name, surface, 3) for name in ('--border-default','--border-error','--border-success','--border-warning','--focus')]
pairs += [('--action-primary-fg', bg, 4.5) for bg in ('--action-primary-bg','--action-primary-hover','--action-primary-pressed')]
pairs += [(name, '--code-bg', 4.5) for name in ('--code-fg','--code-comment','--code-keyword','--code-string','--code-fn','--code-num')]
pairs += [('--text-on-action', color, 4.5) for color in ('--coral','--mint','--yolk')]
for theme,values in [('light',base),('dark',base|dark)]:
    for fg,bg,minimum in pairs:
        ratio=contrast(resolve(fg,values),resolve(bg,values))
        if ratio < minimum: errors.append(f'{theme}: {fg} on {bg} = {ratio:.2f}:1; requires {minimum}:1')

# Asset links added by docs.js must match actual availability.
for folder in ('characters','labels'):
    names = ['atomicbyte','atom-salesman','byte-bot','byte-rocket','transistor','switchboard','atomic-mark'] if folder=='characters' else ['human-made-stamp','human-sticker']
    for name in names:
        for suffix in ('svg','png'):
            if not (ROOT/'assets'/folder/f'{name}.{suffix}').exists(): errors.append(f'Missing download: {folder}/{name}.{suffix}')

for path in ROOT.glob('*.css'):
    source = re.sub(r'url\("data:[^"]*"\)', '', path.read_text())
    for resource in re.findall(r'url\([\'"]?([^\)\'\"]+)',source):
        if resource.startswith(('data:', 'https:')): continue
        if not (ROOT/resource).exists(): errors.append(f'{path.name}: missing CSS asset {resource}')

if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(docs)} documents, local links and assets, field names/errors, and {len(pairs)*2} contrast combinations in both themes.')
