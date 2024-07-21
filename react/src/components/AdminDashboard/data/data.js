import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";

export const navigationLinks = [
    { id: 1, title: 'Restaurants', path: '/admin/restaurants', image: iconsImgs.menu },
    { id: 2, title: 'Categories', path: '/admin/category', image: iconsImgs.budget },
    { id: 3, title: 'Transactions', image: iconsImgs.plane },
    { id: 4, title: 'Subscriptions', image: iconsImgs.wallet },
    { id: 6, title: 'Reports', path: '/admin/report', image: iconsImgs.report },
    { id: 7, title: 'Ratings',path: '/admin/rating', image: iconsImgs.wallet },
    { id: 8, title: 'Comments',path: '/admin/comments',  image: iconsImgs.wealth },
    { id: 9, title: 'Account', image: iconsImgs.user },
    { id: 10, title: 'Settings',path: '/admin/about', image: iconsImgs.gears }
];
// export const navigationLinks = [
//     { id: 1, title: 'Restaurants', path: '/admin/restaurants', image: '/path/to/icon1.png' },
//     { id: 2, title: 'Categories', path: '/admin/category', image: '/path/to/icon2.png' },
//     { id: 3, title: 'Ratings', path: '/admin/rating', image: '/path/to/icon3.png' },
//     { id: 4, title: 'Reports', path: '/admin/report', image: '/path/to/icon4.png' },
//     { id: 5, title: 'Comments', path: '/admin/comments', image: '/path/to/icon5.png' },
//     { id: 6, title: 'About', path: '/admin/about', image: '/path/to/icon6.png' },
//   ];
  
export const transactions = [
    {
        id: 11, 
        name: "Sarah Samir",
        image: personsImgs.person_four,
        date: "23/12/04",
        amount: 500
    },
    {
        id: 12, 
        name: "Rehab Kosbar",
        image: personsImgs.person_three,
        date: "23/07/21",
        amount: 2000
    },
    {
        id: 13, 
        name: "Mona Ali",
        image: personsImgs.person_two,
        date: "23/08/25",
        amount: 3100
    }
];

export const reportData = [
    {
        id: 14,
        month: "Jan",
        value1: 45,
        value2: null
    },
    {
        id: 15,
        month: "Feb",
        value1: 45,
        value2: 60
    },
    {
        id: 16,
        month: "Mar",
        value1: 45,
        value2: null
    },
    {
        id: 17,
        month: "Apr",
        value1: 45,
        value2: null
    },
    {
        id: 18,
        month: "May",
        value1: 45,
        value2: null
    }
];

export const budget = [
    {
        id: 19, 
        title: "Subscriptions",
        type: "Automated",
        amount: 22000
    },
    {
        id: 20, 
        title: "Loan Payment",
        type: "Automated",
        amount: 16000
    },
    {
        id: 21, 
        title: "Foodstuff",
        type: "Automated",
        amount: 20000
    },
    {
        id: 22, 
        title: "Subscriptions",
        type: null,
        amount: 10000
    },
    {
        id: 23, 
        title: "Subscriptions",
        type: null,
        amount: 40000
    }
];

export const subscriptions = [
    {
        id: 24,
        title: "LinkedIn",
        due_date: "23/12/04",
        amount: 20000
    },
    {
        id: 25,
        title: "Netflix",
        due_date: "23/12/10",
        amount: 5000
    },
    {
        id: 26,
        title: "DSTV",
        due_date: "23/12/22",
        amount: 2000
    }
];

export const savings = [
    {
        id: 27,
        image: personsImgs.person_one,
        saving_amount: 250000,
        title: "Pay kid bro’s fees",
        date_taken: "23/12/22",
        amount_left: 40000
    }
]