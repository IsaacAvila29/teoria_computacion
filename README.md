# Teoría de la Computación

## Resumen

- **Autómatas:** Modelos formales (DFA/NFA) que reconocen lenguajes mediante estados y transiciones. Sirven para diseñar analizadores léxicos, máquinas de estado y estudiar propiedades de lenguajes regulares. En JavaScript se pueden representar con objetos que mantienen el estado y aplican transiciones.
- **Expresiones regulares:** Notación compacta para describir patrones en cadenas; equivalentes a los lenguajes regulares. En JavaScript se usan con la clase `RegExp` o literales `/patrón/` y métodos como `test`, `match`, `replace`.
- **Complejidad algorítmica:** Mide tiempo y espacio usando notación Big‑O ($O(n)$, $O(n^2)$, $O(\log n)$). Al implementar algoritmos en JavaScript, favorece soluciones $O(n)$ o $O(n\log n)$ y evita bucles anidados innecesarios y backtracking costoso en expresiones regulares.

## Consejo práctico

- Prefiere algoritmos lineales cuando sea posible y prueba con entradas grandes.
- Usa `console.time` / `console.timeEnd` para medir tiempo en JavaScript.
- Evita expresiones regulares con backtracking excesivo; escribe tests para casos límite.

Si quieres, puedo añadir ejemplos de autómatas simples y snippets en JavaScript en este repositorio.
