import React, { HTMLProps } from 'react'
import Square from './Square'
import Overlay from './Overlay'
import { canMoveKnight, moveKnight, X, Y } from './Game'
import { ItemTypes } from './Game'
import { useDrop } from 'react-dnd'

interface Props {
  x: X
  y: Y
  others?: HTMLProps<HTMLElement>[]
}

const BoardSquare: React.FC<Props> = ({ x, y, children, ...other }) => {
  const black = (x + y) % 2 === 1
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: () => moveKnight(x, y),
    canDrop: () => canMoveKnight(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  return (
    <div
      role="gridcell"
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      {...other}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" data-testid="RedOverlay" />}
      {!isOver && canDrop && (
        <Overlay color="yellow" data-testid="YellowOverlay" />
      )}
      {isOver && canDrop && (
        <Overlay color="green" data-testid="GreenOverlay" />
      )}
    </div>
  )
}

export default BoardSquare
