import json

# Template base (FR)
base = json.load(open('lang/fr.json'))

# Traductions clés communes
translations = {
    'de': {'heroDesc': 'MMORPG-Bot von Spieler. Automatisiert Heilung, Mana, Buffs, Pet für Support-Klassen. Perfekt für Priester, Kleriker, Ringmaster, Barde.'},
    'it': {'heroDesc': 'Bot MMORPG creato da giocatore. Automatizza cure, mana, buff, pet per classi support. Perfetto per Prete, Chierico, Ringmaster, Bardo.'},
    'pt': {'heroDesc': 'Bot MMORPG criado por jogador. Automatiza curas, mana, buffs, pet para classes suporte. Perfeito para Sacerdote, Clérigo, Ringmaster, Bardo.'},
    'ja': {'heroDesc': 'プレイヤーが作ったMMORPGボット。ヒール、マナ、バフ、ペットを自動化。プリースト、クレリック、リングマスター、バードに最適。'},
    'ko': {'heroDesc': '플레이어가 만든 MMORPG 봇. 힐, 마나, 버프, 펫 자동화. 프리스트, 클레릭, 링마스터, 바드에 완벽.'},
    'zh': {'heroDesc': '玩家制作的MMORPG机器人。自动化治疗、法力、增益、宠物。完美支持牧师、神职、舞者、吟游诗人。'},
    'ru': {'heroDesc': 'MMORPG бот от игрока. Автоматизация лечения, маны, баффов, пета для саппорт классов. Идеально для Жреца, Клирика, Рингмастера, Барда.'},
    'pl': {'heroDesc': 'Bot MMORPG stworzony przez gracza. Automatyzuje leczenie, manę, buffy, pet dla klas wsparcia. Idealny dla Księdza, Kleryka, Ringmastera, Barda.'},
    'nl': {'heroDesc': 'MMORPG bot gemaakt door speler. Automatiseert healing, mana, buffs, pet voor support klassen. Perfect voor Priester, Klerk, Ringmaster, Bard.'},
    'tl': {'heroDesc': 'MMORPG bot gawa ng manlalaro. Nag-automate ng heal, mana, buffs, pet para sa support classes. Perpekto para sa Pari, Clerigo, Ringmaster, Bardo.'}
}

for lang, trans in translations.items():
    data = base.copy()
    data.update(trans)
    with open(f'lang/{lang}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'✅ {lang}.json')

print(f'\n🎉 {len(translations)} langues générées!')
