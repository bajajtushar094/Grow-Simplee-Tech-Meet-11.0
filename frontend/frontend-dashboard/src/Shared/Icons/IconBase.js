import React from 'react'
import PropTypes from 'prop-types'

const IconBase = ({ children, width, height, style = {}, ...props }) => (
    <svg
        children={children}
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
        height={height}
        width={width}
        {...props}
        style={{
            ...style,
        }}
    />
)

IconBase.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.node,
    style: PropTypes.object,
}

export default IconBase
