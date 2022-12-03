import { refs } from './refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

refs.checkbox.addEventListener('change', themeChange);

function themeChange(event) {
  const onChecked = event.target.checked;

  if (onChecked) {
    refs.body.classList.remove(Theme.LIGHT);
    refs.body.classList.add(Theme.DARK);
    localStorage.setItem('theme', Theme.DARK);
  } else {
    refs.body.classList.remove(Theme.DARK);
    refs.body.classList.add(Theme.LIGHT);
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

function currentTheme() {
  if (localStorage.getItem('theme') === Theme.DARK) {
    refs.checkbox.checked = true;
    refs.body.classList.add(Theme.DARK);
  }
}
currentTheme();