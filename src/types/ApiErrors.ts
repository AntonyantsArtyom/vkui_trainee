import Messages from "./Messages"

type ErrorNames = Exclude<keyof typeof Messages, "MAX_LIMIT" | "MIN_LIMIT" | "SHOULD_DELETE">

export default ErrorNames
