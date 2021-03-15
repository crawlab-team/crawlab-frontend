const useIcon = () => {
  // implementation
  const isFaIcon = (icon: Icon) => {
    if (Array.isArray(icon)) {
      return icon.length > 0 && icon[0].substr(0, 2) === 'fa';
    } else {
      return icon?.substr(0, 2) === 'fa';
    }
  };

  return {
    // public variables and methods
    isFaIcon,
  };
};

export default useIcon;
