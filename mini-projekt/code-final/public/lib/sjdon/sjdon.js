//***************************************************************************
//  SJDON 4 React
//  Version: 03.03.2025
//***************************************************************************


//  parseSJDON
//  parse SJDON code to React.createElement calls
//
function parseSJDON ([type=Fragment, ...rest]) {

  const isProp = (child) => (
    typeof(child)==='object' 
    && !Array.isArray(child)
    && !child.$$typeof
  )
  const props = Object.assign({}, ...rest.filter(isProp))
  const children = rest.filter(item => !isProp(item))

  const repr = React.createElement(type, props,
    ...children.map(ch => Array.isArray(ch) ? parseSJDON(ch) : ch)
  )
  return repr
}


//  sjdon AND useSJDON
//  decorator for function components with SJDON code
//
//  can be used like this:
//
//    let MyButton = sjdon((props) => (
//      ["button", props.children]
//    ))
//
//  or like this:
//
//    let MyButton = (props) => (
//      ["button", props.children]
//    )
//    MyButton = sjdon(MyButton)
//
//  or attach decorator for several components at once:
//
//    { [MyButton, MySection] = useSJDON(MyButton, MySection) }
//
//  note: use {...} to avoid syntactic ambiguity 
//
const sjdon = (f) => (...args) => parseSJDON(f(...args))
const useSJDON = (...funcs) => funcs.map(sjdon)


//export {
//  parseSJDON,
//  sjdon,
//  useSJDON,
//}
