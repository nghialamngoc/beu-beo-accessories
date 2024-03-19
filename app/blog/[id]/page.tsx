interface BlogProps {
  params: {
    id: string
  }
}

export default async function Blog(props: BlogProps) {
  const id = props.params.id

  return <div>Category {id} 123</div>
}
