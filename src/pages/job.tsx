import { useCallback, useMemo, useState } from "react";
import { Button, Table, Drawer, Form, Input, Select } from "antd";
import { IJob } from "../type/type";
import { MdModeEdit } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setJob } from "../store/slices/jobSlice";
import { companyData } from "../data/data";
// import { jobData } from "../data/data";
// import { v4 as uuidv4 } from "uuid";
const { Option } = Select;
export const Job = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { job } = useSelector((state: RootState) => state.job);
  const { company } = useSelector((state: RootState) => state.company);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingJob, setEditingJob] = useState<IJob | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const removeItem = useCallback(
    (index: number) => {
      const updatedJob = [...job.slice(0, index), ...job.slice(index + 1)];
      dispatch(setJob(updatedJob));
    },
    [job, dispatch]
  );

  const openEditDrawer = (genre: IJob) => {
    setIsEditing(true);
    setEditingJob(genre);
    form.setFieldsValue(genre);
    setIsDrawerVisible(true);
  };

  const openAddDrawer = () => {
    setIsEditing(false);
    setEditingJob(null);
    form.resetFields();
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setEditingJob(null);
    form.resetFields();
  };

  const handleFormSubmit = (values: Omit<IJob, "id">) => {
    if (isEditing && editingJob) {
      const updatedGenres = job.map((genre) =>
        genre.id === editingJob.id ? { ...genre, ...values } : genre
      );
      dispatch(setJob(updatedGenres));
    } else {
      const newJob: IJob = {
        id: Date.now(),
        ...values,
      };
      dispatch(setJob([...job, newJob]));
    }
    closeDrawer();
  };

  const columns = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "id",
        key: "id",
        render: (_: number, __: IJob, index: number) => index + 1,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Technologies",
        dataIndex: "technologies",
        key: "technologies",
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
      },
      {
        title: "Salary",
        dataIndex: "salary",
        key: "salary",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Telegram",
        dataIndex: "telegram",
        key: "telegram",
      },
      {
        title: "Instagram",
        dataIndex: "instagram",
        key: "instagram",
      },
      {
        title: "Company",
        dataIndex: "companyId",
        key: "companyId",
        render: (companyId: number) => {
          const companyName = companyData.find((c) => c.id === companyId);
          return companyName ? companyName.title : "-";
        },
      },
      {
        title: "Actions",
        dataIndex: "id",
        key: "id",
        render: (_: string, genre: IJob, index: number) => {
          return (
            <>
              <Button
                type="text"
                size="small"
                onClick={() => openEditDrawer(genre)}
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
    [job, removeItem]
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

      <Table columns={columns} dataSource={job} rowKey="id" />

      <Drawer
        title={isEditing ? "Edit Company" : "Add Company"}
        visible={isDrawerVisible}
        onClose={closeDrawer}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
          <Form.Item label="technologies" name="technologies">
            <Input />
          </Form.Item>
          <Form.Item label="location" name="location">
            <Input />
          </Form.Item>
          <Form.Item label="salary" name="salary">
            <Input />
          </Form.Item>
          <Form.Item label="phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="telegram" name="telegram">
            <Input />
          </Form.Item>
          <Form.Item label="instagram" name="instagram">
            <Input />
          </Form.Item>
          <Form.Item label="Company" name="companyId">
            <Select>
              {company.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
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
