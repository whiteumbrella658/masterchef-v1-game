import create from 'zustand'

const useCountDown = create((set) => ({
  count: 1500,
  flag: false,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () =>
    set((state) =>
      state.flag === true
        ? state.count === 0
          ? { count: 1500 }
          : { count: state.count - 1 }
        : { count: state.count },
    ),
  reset: () => {
    set({ count: 1500 })
  },
  setFlag: (value) => {
    set({ flag: value })
  },
}))

export default useCountDown
