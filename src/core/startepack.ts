import configurePylint from "../modules/pylint/pylint";
import Context from "./context";

const context = new Context();

configurePylint(context);
context.write("output");
