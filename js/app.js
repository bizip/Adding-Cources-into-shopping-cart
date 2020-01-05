// variables
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector("#clear-cart");


//event listerners
loadEventListeners();

function loadEventListeners() {
    //when new course is added 
    courses.addEventListener('click', byCourse);
    //when remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);
    clearCartBtn.addEventListener('click', clearCart);
    //document loaded
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}

//functions
function byCourse(e) {
    //use delegation to find course that is added
    if (e.target.classList.contains('add-to-cart')) {
        const course = e.target.parentElement.parentElement;
        getCourseInfo(course);
    }

}

function getCourseInfo(course) {
    //create course info
    const courseInfo = {
            image: course.querySelector('img').src,
            title: course.querySelector('h4').textContent,
            price: course.querySelector('.price span').textContent,
            id: course.querySelector('a').getAttribute('data-id')

        }
        //insert into cart
    addIntoCart(courseInfo);
}
//display selected course into the shopping cart
function addIntoCart(course) {
    //create table row
    const row = document.createElement('tr');
    //build templete
    row.innerHTML = `
        <tr>
        <td>
        <img src="${course.image}  " width='100'>
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
        <a href="#" class="remove" data-id="${course.id}">X</a>
        </td>
        
        </tr>
        
        
        `;
    //add into shopping cart
    shoppingCartContent.appendChild(row);
    //add course into the local storage
    saveIntoStorage(course);

}

//add the courses into the local storage
function saveIntoStorage(course) {
    let courses = getCourseFromStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));


}
//get courses from thestorage
function getCourseFromStorage() {
    let courses;
    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

//function remove course
function removeCourse(e) {
    //remove from the dom
    let course, courseId;
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = courses.querySelector('a').getAttribute('data-id');

    }

    //remove from localStorage
    removeCourseLocalStorage(courseId);



}

function removeCourseLocalStorage(id) {
    // get local storage data
    let coursesLS = getCourseFromStorage();
    //loop through the loop and find what to do
    coursesLS.forEach(function(courseLS, index) {
        if (courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });
    //set the les item
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//clear cart 
function clearCart() {
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);

    }
    //and then clear the local storage
    clearLocalStorage();

}
// clear the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

//load when document is loaded and display courses into the carts
function getFromLocalStorage() {
    let coursesLS = getCourseFromStorage();
    coursesLS.forEach(function(course) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <tr>
        <td>
        <img src="${course.image}  " width='100'>
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
        <a href="#" class="remove" data-id="${course.id}">X</a>
        </td>
        
        </tr>
        
        
        `;
        //add into shopping cart
        shoppingCartContent.appendChild(row);
    });


}