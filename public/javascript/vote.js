var vote = window.location.toString().split('?')[
  window.location.toString().split('?').length - 1
  ];

console.log(vote);

if (vote==1){
  voteYay();
}

if (vote==0){
  voteNay();
}

async function voteYay(event) {
  //event.preventDefault();

  var answer = vote;
  // const question_id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];
  const question_id = document.querySelector('#question-id').value;
  //console.log(question_id);
  
  const response = await fetch(`/api/votes`, {
    method: 'POST',
    body: JSON.stringify({
      answer,
      question_id,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.log("voted yay successfullY");
  } else {
    alert(response.statusText);
  }

}

async function voteNay(event) {
  //event.preventDefault();

  var answer = vote;
  //const answer = document.querySelector('#btn-nay').value;
  // const question_id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];
  const question_id = document.querySelector('#question-id').value;

  const response = await fetch(`/api/votes`, {
    method: 'POST',
    body: JSON.stringify({
      answer,
      question_id,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.log("voted nay successfullY");
  } else {
    alert(response.statusText);
  }

}