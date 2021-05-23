const votingPanel = document.querySelector("#voting-panel");
const resultsPanel = document.querySelector("#results-panel");

resultsPanel.hidden = true;

document.querySelector('#btn-yay').addEventListener('click', voteYay);

async function voteYay(event) {
  event.preventDefault();

  const answer = document.querySelector('#btn-yay').value;
  const question_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

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
    alert("voted yay successfullY");
  } else {
    alert(response.statusText);
  }

  votingPanel.hidden = true;
  resultsPanel.hidden = false;

}
document.querySelector('#btn-yay').addEventListener('click', voteYay);

async function voteNay(event) {
  event.preventDefault();

  const answer = document.querySelector('#btn-nay').value;
  const question_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

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
    alert("voted nay successfullY");
  } else {
    alert(response.statusText);
  }

  votingPanel.hidden = true;
  resultsPanel.hidden = false;

}
document.querySelector('#btn-nay').addEventListener('click', voteNay);