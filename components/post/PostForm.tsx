"use client";

import { useState } from "react";

import { deleteProduct, updateProduct, newProduct } from "@/utils/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: string;
  content: string | null;
  description: string | null;
  category: string | null;
};

type FormData = {
  content: string;
  description: string;
  category: string;
};

type FormTodoProps = {
  products: Array<Product>;
};

const FormTodo: React.FC<FormTodoProps> = ({ products }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    content: "",
    description: "",
    category: "",
  });

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      content: product.content || "",
      description: product.description || "",
      category: product.category || "",
    });
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (editingProduct) {
      await updateProduct(editingProduct.id, formData);
    } else {
      await newProduct(new FormData(event.target as HTMLFormElement));
    }
    setEditingProduct(null);
    setFormData({ content: "", description: "", category: "" });
  };

  return (
    <div className=" space-x-10 bg-white p-5 min-h-screen rounded-lg">
      <form onSubmit={handleSave}>
        <div className="space-y-3">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              name="content"
              id="title"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Short t-shirt"
              type="text"
            />
          </div>
          <div>
            <div>Description</div>
            <Textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full h-32 border p-3"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>
        </div>
        <Button className="mt-3" type="submit">
          {editingProduct ? "Update" : "Save"}
        </Button>
      </form>

      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.content}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="flex space-x-2 justify-end">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
                <Button onClick={() => handleEdit(product)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FormTodo;
