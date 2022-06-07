let courses = [
    { name: "Courses in England", prices: [0, 100] }, 
    { name: "Courses in Germany", prices: [500, null] }, 
    { name: "Courses in Italy", prices: [100, 200] }, 
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 100];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

////Функция, создающая множество элементов от start до end
let rangeTo = (start, end) => {
    let max = courses.reduce((prev, cur) => {
        if (Math.max(...prev.prices) > Math.max(...cur.prices)) {
          return prev
        }
        return cur
      });
    if (end === null) {
        end = Math.max(...max['prices'])
    }
    let range = new Set([...Array(end - start + 1).keys()].map(x => x + start));
    return range
}
//Функция, проверящая, есть ли элементы одного множество в другом. Если есть, то true
let hasElement = (set1, set2) => {
    for (const elem of set2) {
        if(set1.has(elem)){
            return true;
        }
    }
    return false
}

let priceFilter = (courses, requiredRange) =>{
    let filtered = []
    let requiredPriceFrom = Math.min(...requiredRange)
    let requiredPriceTo = Math.max(...requiredRange)
    let requiredPrices = rangeTo(requiredPriceFrom, requiredPriceTo);
    for (const course of courses) {
        let coursePriceFrom = course['prices'][0];
        let coursePriceTo = course['prices'][1];
        let coursePrices = rangeTo(coursePriceFrom, coursePriceTo);
        let intersection = hasElement(requiredPrices, coursePrices);
        if(intersection){
            filtered.push(course)
        }
    }
    return filtered
}

//Сортировка объекта по цене
let sortByPrice = (array) => {
    return array.sort((a, b) => a.prices[0] > b.prices[0] ? 1 : -1);
  }

a = priceFilter(sortByPrice(courses), requiredRange1)
b = priceFilter(sortByPrice(courses), requiredRange2)
c = priceFilter(sortByPrice(courses), requiredRange3)
console.log(a)
console.log(b)
console.log(c)



