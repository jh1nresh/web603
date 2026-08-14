import { useDispatch, useSelector } from "react-redux";
import { toggleDarkTheme } from "./redux/actions";

function DarkThemeToggle() {
  const isDarkTheme = useSelector((state) => state.isDarkTheme);
  const dispatch = useDispatch();

  return (
    <label>
      <input
        type="checkbox"
        checked={isDarkTheme}
        onChange={() => dispatch(toggleDarkTheme())}
      />{" "}
      Use Dark Theme
    </label>
  );
}

export default DarkThemeToggle;
