1. Class `.numberBox` , `.passwordLength` , `.submitButton` - есть в html, нет в CSS
2. `Password length: (from 1 to 20)` - семантически не корректно класть текст в `div`, можно использовать лейбл для инпута (самое правильное) / параграф /span
3. Input `name="lowercaseletters , name="uppercaseletters"` - использовать camelCase
4. При генерации нового пароля стоит добавить функцию для сброса SVG в стартовое состояние. Сейчас если ты скопировал пароль, а потом решил сделать новый, клик на "копировать в буфер" горит синим, а новое копирование делает его не активным.
5. В функциях `generatePasswordArr` и `generatePassword` делается рандомный микс массива. Вполне достаточно делать это один раз, результат визуально не меняется.
6. Функция `generatePasswordArray` - можно очень сильно сократить кол-во кода, используя код UTF-16

Например, для всех букв + символов:  
 let str = '';
for (let i = 65; i < 123; i++) {
str += String.fromCodePoint(i);
}
Для цифр 0-9:
let i = 48; i < 58;

7. Абстрактность - в функцию `generatePasswordArray` вместо 4ых фиксированных аргументов можно передавать целиком formData. Плюсы такого подхода:
   1 меньше кода)
   2 если ты захочешь добавить/удалить критерии, тебе нужно будет минимально переписывать код
   Логика работы абстрактной функции:

   - есть объект `values`, методы которого возвращают символы UTF-16
   - методы называются также как значение в formData (или,например, `checkUppersCaseLetters`)
   - для каждого значения formData ты вызываешь соответствующий метод `values`, например
     `values[checkUppersCaseLetters]()`

8. При небольшой длине каких-то выбранных символов может не оказаться в сгенерированном пароле (маленьких букв, цифр и тп). Нужна функция проверка через регулярное выражение на наличие каждого вида символов.
