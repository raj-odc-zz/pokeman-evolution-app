export default {
  objectCompare: (order) => {
    return (objA, objB) => {
      const strA = objA.name.toUpperCase();
      const strB = objB.name.toUpperCase();

      let comparison = 0;
      if (strA > strB) {
        comparison = 1;
      } else if (strA < strB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  },
}