window.onload = async () => {
  const posts = await getPosts();
  for (const post of posts) {
    // Missing topic is replaced with 'Other'
    const topic = post._embedded['wp:term'][2][0]?.name || 'Other';
    const dateTerm = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(post.date));

    addCard({
      id: post.id,
      topic: topic,
      imgURL: post.featured_media,
      link: post.link,
      title: post.title.rendered,
      author: post._embedded.author[0].name,
      authorURL: post._embedded.author[0].link,
      date: dateTerm,
    });
  }
};

const getPosts = async () => {
  const url = `https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json`;
  const res = await fetch(url);
  const posts = await res.json();
  return posts;
};

/**
 * Adds a post card to the DOM.
 * @param {Object} props
 * @param {number} props.id - Post ID
 * @param {string} props.topic - Name of the topic
 * @param {string} props.imgURL - URL of post's image
 * @param {string} props.link - URL of the post
 * @param {string} props.title - Title of the post
 * @param {string} props.author - Name of the post's author
 * @param {string} props.authorURL - URL of the author's page
 * @param {string} props.dateTerm - The formatted date with day, month, year
 */
const addCard = (props) => {
  const card = document.createElement('div');
  card.setAttribute('id', props.id);
  card.setAttribute('class', 'col-4 p-card--highlighted');

  // I wasn't sure if the "Article" text in the footer was meant to be taken from somewhere in the API.
  // Maybe from the embedded category object that has name:"Articles"?
  card.innerHTML = `
    <div class="p-card__header p-card__inner u-sv-1">
      <h5 class="p-muted-heading">${props.topic}</h5>
    </div>
    <div class="p-card__content p-card__inner">
      <img
        class="p-card__image"
        alt="post image"
        src="${props.imgURL}"
      />
      <h4>
        <a href="${props.link}">${props.title}</a>
      </h4>
      <em
        >By <a href="${props.authorURL}">${props.author}</a>
        on ${props.date}
      </em>
    </div>
    <div class="p-card__footer p-card__inner">
      <p>Article</p>
    </div>`;

  const cardRow = document.getElementById('card-row');
  if (cardRow) {
    cardRow.appendChild(card);
  }
};
