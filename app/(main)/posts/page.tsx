import BackButton from "@/components/BackButton";
import FormTodo from "@/components/post/PostForm";
import db from "@/utils/db";

const getProducts = async () => {
  const products = await db.products.findMany({});

  return products;
};

const PostsPage = async () => {
  const products = await getProducts();

  return (
    <>
      <BackButton text="Go Back" link="/" />
      <FormTodo products={products} />
    </>
  );
};

export default PostsPage;
