export default class BookstoreService {
    constructor() {
        this.data = [{
            id: 1,
            title: 'JavaScript. Шаблоны',
            author: 'Стефанов С',
            price: 45,
            coverImage: "https://i.pinimg.com/originals/d0/1c/d6/d01cd6b83c0ed08419a9ad928c266184.jpg"
        },{
            id: 2,
            title: 'Американские боги',
            author: 'Нил Гейман',
            price: 63,
            coverImage: "https://mybook.biz.ua/data_resized/7/5/0/c/b/750cb169b940030d10a5bac1d1a9daade207634d.jpeg"
        }];
    }


    getBooks() {
        return new Promise((resolve, reject) => {

            setTimeout(
                ()=> {
                    const randomError = Math.random();
                    if (randomError > 0.3) return resolve(this.data);
                    return reject(new Error('something bad happened'))
                }
                , 1000
            )
        });
    }
}