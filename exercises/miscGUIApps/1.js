const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
                 'general-purpose programming language. It was designed and developed in the mid-1990s ' +
                 'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
                 'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
                 'including functional, object-oriented, and imperative. It also has a dynamic type ' +
                 'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
                 'programming language. It has been standardized in the ECMAScript language ' +
                 'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
                 'technologies of World Wide Web content production; the majority of websites employ ' +
                 'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
                 'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
                 'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
                 'with a long history and a distinctive, fully parenthesized prefix notation. ' +
                 'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
                 'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
                 'since its early days, and many dialects have existed over its history. Today, the best ' +
                 'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  },

  {
    name: 'Python',
    description: 'Python is a high-level programming language known for its clear, English-like syntax ' +
                  'and emphasis on code readability.'
  }
];

function createElement(elementType, content, className) {
  const thisElement = document.createElement(elementType);
  if (content) thisElement.textContent = content;
  if (className) thisElement.classList.add(className);

  return thisElement;
}

function loadLanguages() {
  const languagesDiv = document.getElementById('languages');

  languages.forEach(language => {
    const thisDiv = createElement('div', null, 'lang');
    thisDiv.dataset.lang = language.name;
    const thisHeading = createElement('h2', language.name);
    const thisParagraph = createElement('p', getParagraphContent(language));

    thisDiv.appendChild(thisHeading);
    thisDiv.appendChild(thisParagraph);

    if (language.description.length > 120) {
      const thisAnchor = createElement('a', 'Show More', 'more');
      thisAnchor.href = '#';
      thisDiv.appendChild(thisAnchor);
    }

    languagesDiv.appendChild(thisDiv);
  });
}

function getParagraphContent(language, showMore = false) {
  const fullDescription = language.description;
  if (showMore || fullDescription.length <= 120) return fullDescription;
  return fullDescription.slice(0, 120) + '...';
}

function toggleAnchor(anchor) {
  const newContent = anchor.textContent === 'Show More' ? 'Show Less' : 'Show More';
  anchor.textContent = newContent;
}

document.addEventListener('DOMContentLoaded', () => {
  loadLanguages();

  const showMoreAnchors = document.querySelectorAll('.more');

  showMoreAnchors.forEach(anchor => {
    const lang = anchor.parentElement.dataset.lang;
    const langObj = languages.find(l => l.name === lang);
    const sibParagraph = anchor.previousElementSibling;

    anchor.addEventListener('click', event => {
      event.preventDefault();
      toggleAnchor(anchor);
      const showMore = anchor.textContent === 'Show Less';
      sibParagraph.textContent = getParagraphContent(langObj, showMore)
    });
  });
});
