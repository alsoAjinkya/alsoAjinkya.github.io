const value_div = document.querySelector(".value_div");
const value_items = Array.from(document.querySelectorAll(".value_cnt"));
const review_div = document.querySelector(".review_div_mid")
const review_items = Array.from(document.querySelectorAll(".review_cnt"))
const indicators = Array.from(document.querySelectorAll(".indicator"));
let value_items_ptr = 0
let review_items_ptr = 0
let scroll_timeout = 2000
let timeout_ref


const observer = new IntersectionObserver(onIntersectionObserved, {
  root: value_div,
  threshold: 0.6
});


function onIntersectionObserved(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
      const intersectingIndex = value_items.indexOf(entry.target);
      activateIndicator(intersectingIndex);
    }
  });
}

function activateIndicator(index) {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
}


function findValueItemPosition(obj) {
    return obj.offsetLeft - 17;
}

function findReviewItemMidPosition(obj, multiplier) {
    return obj.clientWidth * review_items_ptr
}

function scrollValueItems(stop_scrolling){

    if (value_items_ptr >= value_items.length){
        value_items_ptr = 0
    }
    value_div.scroll({
        top: 0,
        left: findValueItemPosition(value_items[value_items_ptr]),
        behavior: "smooth",
    })
    value_items_ptr++
    timeout_ref = setTimeout(()=>{
        scrollValueItems(false)
    }, scroll_timeout)
}


function reviewScroll(direction){
    if (direction == "left"){
        console.log("left")
        review_items_ptr--
        if (review_items_ptr < 0) review_items_ptr = (review_items.length - 1)
        review_div.scroll({
            top:0,
            left:findReviewItemMidPosition(review_items[review_items_ptr], review_items_ptr),
            behavior: "smooth"
        })
    
    }
    else{
        console.log("right")
        review_items_ptr++
        if (review_items_ptr > review_items.length-1) review_items_ptr = 0
        review_div.scroll({
            top:0,
            left:findReviewItemMidPosition(review_items[review_items_ptr], review_items_ptr),
            behavior: "smooth"
        })
    }
}


// setTimeout(()=>{
//     review_div.scroll({
//         top: 0,
//         left: findReviewItemMidPosition(review_items[0]),
//         behavior: "smooth"
//     })
//     console.log(review_items[1].clientWidth)
//     console.log("done")
// }, 3000)

value_items.forEach(item => {
    observer.observe(item);
});

scrollValueItems()

console.log(review_items.length)

document.querySelector("#review_left_btn").addEventListener("click", ()=> reviewScroll("left"))
document.querySelector("#review_right_btn").addEventListener("click", ()=> reviewScroll("right"))