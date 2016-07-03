(function() {

  "use strict";

  function target(e) { return e.currentTarget; }
  function next(e) { return e.currentTarget.nextElementSibling; }

  function displayNextElement(d) {
    var nextElement = next(this);
    if (nextElement) {
      nextElement.style.display = d;
    }
  }

  function showUL(e) {
    displayNextElement.call(e, "inline-block");
  }

  function hideUL(e) {
    if (next(e)) {
      displayNextElement.call(e, "none");
    }
  }

  function toArray() {
    var self = this;
    return Object.keys(this).map(function (x) {
      return self[x];
    });
  }

  function setActive(ul, index) {
    if (ul.children.length > 0) {
      var active = ul.querySelector(".active");
      if (active) {
        active.className = "";
      }
      ul.children[index].className = "active";
    }
  }

  function getActiveValue(ul) {
    var active = ul.querySelector(".active");
    return active ? active.innerText : "";
  }

  function selectActiveValue(e) {
    if (e.key === "Tab" || e.key === "Enter") {
      var target = e.currentTarget;
      if (target.value.length > 0) {
        target.value = getActiveValue(target.nextElementSibling);
      }
    }
  }

  function changeActiveValue(e) {

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {

      // On récupère l'index de la suggestion active
      var target = e.currentTarget,
          ul = target.nextElementSibling,
          lis = toArray.apply(ul.children),
          active = ul.querySelector(".active");

      var index = lis.indexOf(active);

      // Gestion des flèches

      // ArrowDown descend la suggestion active jusqu'au bout puis round-robin
      if (e.key === "ArrowDown") {
        index = index === lis.length - 1 ? 0 : index + 1;
      }

      // ArrowUp remonte la suggestion active jusqu'au bout puis round-robin
      if (e.key === "ArrowUp") {
        index = (index === -1 || index === 0) ? lis.length - 1 : index - 1;
      }

      // On passe le caractère actif de la suggestion précédente vers la nouvelle
      if (active) {
        active.className = "";
      }
      lis[index].className = "active";
      target.value = lis[index].innerText;
    }
  }

  function buildSuggestions(e) {

    var target = e.currentTarget,
        value = target.value.toLowerCase(),
        opts = target.getAttribute("my-autocomplete"),
        data = opts ? JSON.parse(opts) : {},
        parent = target.parentElement;

    // Options par défaut
    data.maxItems = data.maxItems || 20;
    data.list = data.list || [];
    data.markItems = data.markItems || false;

    // Si l'ul contenant les suggestions n'existe pas, on la crée
    if (!target.nextElementSibling) {
      var newUl = document.createElement("UL");
      parent.insertBefore(newUl, target.nextElementSibling);
    }

    var ul = target.nextElementSibling;

    // Si e.key.length > 1, il s'agit donc d'une touche spéciale et non d'un caractère
    if (e.key && e.key.length > 1 && e.key !== 'Backspace') {
      return;
    }

    // Puisqu'on a tapé une touche, on supprime les précédents suggestions
    ul.innerText = "";

    var lisToAdd = [];

    // Dans la liste des possibles suggestions, on marque chaque lettre présente dans l'input
    data.list.forEach(function (li) {

      if (data.markItems) {

        var letters = value.split(""),
            text = li.split("");

        letters.forEach(function(letter) {
          text = text.map(function(t) {
            if (t.toLowerCase() === letter) {
              return "<span class='ac-found'>" + t + "</span>";
            }
            return t;
          });
        });

        // On réassemble le contenu de la suggestion
        li = text.join("");
      }

      // Si la suggestion contient toutes les lettres de l'input, on la rajoute à la liste des suggestions à afficher
      // On escape les caractères qui perturbent les regexp au préalable

      var cleanLi = li.toLowerCase().replace(/(<[^>]*>)/g, "");
      var r = new RegExp("[^" + cleanLi.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "]", "i");

      // Si la suggestion contient exactement l'input, on l'ajoute en début de liste, sinon, à la suite

      if (value.length && cleanLi.indexOf(value) > -1) {
        lisToAdd.splice(0, 0, li);
      } else if (!r.test(value)) {
        lisToAdd.push(li);
      }

    });

    // Build les x premières suggestions
    lisToAdd.splice(0, data.maxItems).forEach(function (html) {
      var li = document.createElement("LI");
      li.innerHTML = html;
      li.addEventListener("mouseenter", function (e) {
        e.currentTarget.classList.add("active");
      });
      li.addEventListener("mouseleave", function (e) {
        var t = e.currentTarget;
        t.classList.remove("active");
        setActive(t.parentElement, 0);
      });
      li.addEventListener("mousedown", function (e) {
        var t = e.currentTarget;
        t.parentElement.previousElementSibling.value = t.innerText;
      });
      ul.appendChild(li);
    });

    parent.insertBefore(ul, target.nextElementSibling);
    setActive(ul, 0);

  }

  function addEventToAutocomplete(autoComplete) {

    // Rend visible la liste des suggestions au focus
    autoComplete.addEventListener("focus", showUL);

    autoComplete.addEventListener("focus", buildSuggestions);

    // Rend inivisble la liste des sugggestions au blur
    autoComplete.addEventListener("blur", hideUL);

    // Gestion du clavier
    autoComplete.addEventListener("keyup", buildSuggestions);

    // Gestion des touches Tab et Enter
    autoComplete.addEventListener("keydown", selectActiveValue);

    // Gestion des flèches haut et bas
    autoComplete.addEventListener("keydown", changeActiveValue);

  }

  (function() {

    // On récupère tous les inputs de type my-autocomplete
    var autoCompletes = document.querySelectorAll("input[my-autocomplete]");

    // On leur colle les events qui vont bien
    Array.prototype.map.call(autoCompletes, addEventToAutocomplete);

    // On colle chaque input au sein d'un div pour le placement
    Array.prototype.map.call(autoCompletes, function (input) {
      var div = document.createElement("DIV");
      div.classList.add("my-autocomplete");
      input.parentElement.insertBefore(div, input);
      div.appendChild(input);
    });
  })();

})();