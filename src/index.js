/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++ ) {
    fn(array[i], i, array);
}
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  var results = [];
    for (let i = 0; i < array.length; i++ ) {
        var item = fn(array[i], i, array);
        results.push(item);
    }
    return results;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  let i = 0;
    let result = initial || array[i++];

    while (i < array.length) {
        result = fn(result, array[i], i, array);
        i++;
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let arr = [];

  for (let prop in obj) {
      if (!obj.hasOwnProperty(prop)) {
          continue;
      }
      arr.push(prop.toUpperCase());
  }

  return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  let arr = [];

  from = (typeof from !== 'undefined') ? from : 0;
  to = (typeof to !== 'undefined') ? to : array.length;

  from = getNormalVariable(from);
  to = getNormalVariable(to);

  function getNormalVariable(direct) {
      if (direct < 0) {
          direct = (Math.abs(direct) > array.length) ? 0 : direct + array.length;
      } else {
          direct = (direct > array.length) ? array.length : direct;
      }

      return direct;
  }

  while (from < to) {
      arr.push(array[from++]);
  }

  return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
        target[prop] = value * value;

        return true;
    }
});
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
