document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("poll__title");
  const answersEl = document.getElementById("poll__answers");

  let pollId = null;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");

  xhr.onload = () => {
    if (xhr.status !== 200) return;

    const poll = JSON.parse(xhr.responseText);
    pollId = poll.id;

    titleEl.textContent = poll.data.title;
    answersEl.innerHTML = "";

    poll.data.answers.forEach((answerText, index) => {
      const btn = document.createElement("button");
      btn.className = "poll__answer";
      btn.textContent = answerText;

      btn.addEventListener("click", () => {
        alert("Спасибо, ваш голос засчитан!");
        sendVote(pollId, index);
      });

      answersEl.appendChild(btn);
    });
  };

  xhr.send();

  function sendVote(id, answerIndex) {
    const voteXhr = new XMLHttpRequest();
    voteXhr.open(
      "POST",
      "https://students.netoservices.ru/nestjs-backend/poll",
    );
    voteXhr.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded",
    );

    voteXhr.onload = () => {
      if (voteXhr.status !== 200) return;

      const result = JSON.parse(voteXhr.responseText);
      const stat = result.stat;

      const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);

      answersEl.innerHTML = "";

      stat.forEach((item) => {
        const percent =
          totalVotes === 0 ? 0 : Math.round((item.votes / totalVotes) * 100);

        const line = document.createElement("div");
        line.className = "poll__result";
        line.textContent = `${item.answer}: ${item.votes} (${percent}%)`;

        answersEl.appendChild(line);
      });
    };

    voteXhr.send(
      `vote=${encodeURIComponent(id)}&answer=${encodeURIComponent(answerIndex)}`,
    );
  }
});
