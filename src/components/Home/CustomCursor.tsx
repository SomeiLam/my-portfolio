import useMousePosition from '../../hooks/useMousePosition';

const CustomCursor = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      style={{
        position: 'fixed',
        top: y,
        left: x,
        width: 40,
        height: 40,
        background: 'purple',
        border: '1px solid black',
        borderRadius: '50%',
        mixBlendMode: 'exclusion',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    />
  );
};

export default CustomCursor;
