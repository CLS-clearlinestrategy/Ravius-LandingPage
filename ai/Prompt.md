🧠 1. Suavizar o tempo do vídeo (LERP)
📍 Contexto do problema

Você percebe que:

quando dá um scroll pequeno → o vídeo desacelera antes de chegar no frame correto
parece que “falta fluidez” no final do movimento
sensação de FPS baixo, mas não é performance real
🎯 O que está errado

O vídeo está seguindo o scroll instantaneamente, mas o scroll tem easing → desaceleração.

💡 O que essa solução faz

Cria um “atraso inteligente”:

o scroll define um alvo
o vídeo vai chegando até ele suavemente
✅ Quando usar
sempre que houver smooth scroll
quando o problema for “freada” ou falta de fluidez