import { Messager } from "./Messager";

/**
 * GlobalMessager is a singleton reference to a Messager class.
 * 
 * Acts as an engine-wise messager that can be used for miscellaneous events.
 */
const GlobalMessager = new Messager();
export default GlobalMessager;