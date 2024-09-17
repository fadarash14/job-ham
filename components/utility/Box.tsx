import styled from 'styled-components'
import {
    space,
    layout,
    flexbox,
    FlexboxProps,
    LayoutProps,
    SpaceProps, ColorProps, color,
} from 'styled-system'

let Box = styled("div").attrs(props=>({...props,className:props.className}))<FlexboxProps|LayoutProps|SpaceProps|ColorProps>`
${space}
${layout}
${flexbox}
${color}
`
export default Box