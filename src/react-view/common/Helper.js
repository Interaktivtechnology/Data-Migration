
/*
  Printing error view to user
  message : React component or plain string, shown message
  state : string, can be warning, success, danger (from bootstrap theme). Default will be warning.
  return React.Component
*/
export function printErrorView(message : string, state : string, closeCallback)
{
  state = state ? state : "warning"
  let errorView = <div className={"alert alert-" + state + " alert-dismissible"} role="alert">
                <button type="button" className="close" onClick={closeCallback} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                {message}
              </div>
  return errorView
}
