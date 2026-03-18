document.getElementById("feedbackForm").addEventListener("submit", function(e){
e.preventDefault();

let user = JSON.parse(localStorage.getItem("user"));

let feedback = {
name: user ? user.name : "Anonymous",
department: user ? user.department : "Unknown",
rating: rating.value,
comments: comments.value,
date: new Date().toLocaleString()
};

let data = JSON.parse(localStorage.getItem("feedbacks")) || [];
data.push(feedback);

localStorage.setItem("feedbacks", JSON.stringify(data));

loadFeedback();
});

function loadFeedback(){
let data = JSON.parse(localStorage.getItem("feedbacks")) || [];
let list = document.getElementById("feedbackList");
let avgBox = document.getElementById("avg");

list.innerHTML = "";

let total = 0;

data.forEach(item => {
total += parseInt(item.rating);

let div = document.createElement("div");
div.className = "feedback-item";

div.innerHTML = `
<b>${item.name}</b> (${item.department}) <br>
Rating: ${item.rating} <br>
${item.comments} <br>
<small>${item.date}</small>
`;

list.appendChild(div);
});

if(data.length > 0){
avgBox.innerHTML = "Average Rating: " + (total/data.length).toFixed(2);
}
}

loadFeedback();
