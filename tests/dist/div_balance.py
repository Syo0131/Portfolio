#!/usr/bin/env python3
import sys
from html.parser import HTMLParser

class DivCounter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.div_balance = 0

    def handle_starttag(self, tag, attrs):
        if tag.lower() == 'div':
            self.div_balance += 1

    def handle_endtag(self, tag):
        if tag.lower() == 'div':
            self.div_balance -= 1

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: div_balance.py <html-file>")
        sys.exit(1)
    
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        content = f.read()
    
    parser = DivCounter()
    parser.feed(content)
    
    if parser.div_balance != 0:
        print(f"FAIL: div balance {parser.div_balance}")
        sys.exit(1)
    
    sys.exit(0)
