import { useRouter } from "next/router";

const CategoryPage = () => {
  const router = useRouter();
  const { category }: any = router.query;
  return (
    <div>
      Hello {category}
    </div>
  )
}

export default CategoryPage;