import { useCallback, useMemo, useState } from "react";
import { Button, Table, Drawer, Form, Input, message } from "antd";
import { ICompany } from "../type/type";
import { MdModeEdit } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCompany } from "../store/slices/companySlice";

export const CompanyTable = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company } = useSelector((state: RootState) => state.company);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<ICompany | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const removeItem = useCallback(
    (index: number) => {
      const updatedGenres = [
        ...company.slice(0, index),
        ...company.slice(index + 1),
      ];
      dispatch(setCompany(updatedGenres));
    },
    [company, dispatch]
  );

  const openEditDrawer = (company: ICompany) => {
    setIsEditing(true);
    setEditingCompany(company);
    form.setFieldsValue(company);
    setIsDrawerVisible(true);
  };

  const openAddDrawer = () => {
    setIsEditing(false);
    setEditingCompany(null);
    form.resetFields();
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setEditingCompany(null);
    form.resetFields();
  };

  const handleSubmit = (values: Omit<ICompany, "id">) => {
    if (isEditing && editingCompany) {
      const updatedCom = company.map((company) =>
        company.id === editingCompany.id ? { ...company, ...values } : company
      );
      dispatch(setCompany(updatedCom));
    } else {
      const newCom: ICompany = {
        id: Date.now(),
        ...values,
      };
      dispatch(setCompany([...company, newCom]));
    }
    closeDrawer();
  };

  const columns = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "id",
        key: "id",
        render: (_: number, __: ICompany, index: number) => index + 1,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Description",
        dataIndex: "desc",
        key: "desc",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
      },
      {
        title: "Website",
        dataIndex: "website",
        key: "website",
      },
      {
        title: "Actions",
        dataIndex: "id",
        key: "id",
        render: (_: string, company: ICompany, index: number) => {
          return (
            <>
              <Button
                type="text"
                size="small"
                onClick={() => openEditDrawer(company)}
              >
                <MdModeEdit />
              </Button>
              <Button
                type="text"
                size="small"
                onClick={() => removeItem(index)}
              >
                <HiOutlineTrash />
              </Button>
            </>
          );
        },
      },
    ],
    [company, removeItem]
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={openAddDrawer}
        style={{ marginBottom: 16 }}
      >
        Add
      </Button>

      <Table columns={columns} dataSource={company} rowKey="id" />

      <Drawer
        title={isEditing ? "Edit Company" : "Add Company"}
        visible={isDrawerVisible}
        onClose={closeDrawer}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="desc">
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Input />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Save" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
