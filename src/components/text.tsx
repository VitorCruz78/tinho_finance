interface IText {
  value: string
  type: 'h1' | 'h2' | 'p'
}

export function Text({ value, type }: IText) {
  return (
    type === "h1" ?
      <h1 className="text-primaryText text-xl sm:text-2xl md:text-4xl font-bold">{value}</h1> :
      type === "h2" ?
        <h2 className="text-primaryText text-base sm:text-xl md:text-2xl">{value}</h2> :
        type === "p" &&
        <p className="text-primaryText text-base md:text-lg">{value}</p>
  )
}
