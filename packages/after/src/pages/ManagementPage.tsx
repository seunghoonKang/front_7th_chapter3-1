import React, { useState, useEffect } from "react";
import { Alert, Modal } from "../components/organisms";
import { FormInput, FormSelect, FormTextarea } from "../components/molecules";
import { useUserManagement } from "../hooks/useUserManagement";
import { usePostManagement } from "../hooks/usePostManagement";
import type { Post } from "../services/postService";
import "../styles/components.css";
import { EntityTypeSelector } from "@/components/EntityTypeSelector";
import { Button } from "@/components/ui/button";

import UserPage from "./UserPage";
import PostPage from "./PostPage";

type EntityType = "user" | "post";

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");

  // User 관련 상태 및 핸들러
  const userManagement = useUserManagement();

  // Post 관련 상태 및 핸들러
  const postManagement = usePostManagement();

  // 현재 엔티티 타입에 따른 관리 객체 선택
  const currentManagement =
    entityType === "user" ? userManagement : postManagement;

  // 엔티티 타입 변경시 데이터 로드
  useEffect(() => {
    if (entityType === "user") {
      userManagement.loadUsers();
    } else {
      postManagement.loadPosts();
    }
  }, [entityType]);

  // 모달 닫기 헬퍼
  const handleCloseCreateModal = () => {
    currentManagement.setIsCreateModalOpen(false);
    currentManagement.setFormData({});
  };

  const handleCloseEditModal = () => {
    currentManagement.setIsEditModalOpen(false);
    currentManagement.setFormData({});
  };

  // ===== 생성 모달 렌더링 =====
  const renderCreateModalContent = () => {
    if (entityType === "user") {
      return (
        <>
          <FormInput
            name="username"
            value={userManagement.formData.username || ""}
            onChange={(value) =>
              userManagement.setFormData({
                ...userManagement.formData,
                username: value,
              })
            }
            label="사용자명"
            placeholder="사용자명을 입력하세요"
            required
            width="full"
            fieldType="username"
          />
          <FormInput
            name="email"
            value={userManagement.formData.email || ""}
            onChange={(value) =>
              userManagement.setFormData({
                ...userManagement.formData,
                email: value,
              })
            }
            label="이메일"
            placeholder="이메일을 입력하세요"
            type="email"
            required
            width="full"
            fieldType="email"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <FormSelect
              name="role"
              value={userManagement.formData.role || "user"}
              onChange={(value) =>
                userManagement.setFormData({
                  ...userManagement.formData,
                  role: value,
                })
              }
              options={[
                { value: "user", label: "사용자" },
                { value: "moderator", label: "운영자" },
                { value: "admin", label: "관리자" },
              ]}
              label="역할"
              size="md"
            />
            <FormSelect
              name="status"
              value={userManagement.formData.status || "active"}
              onChange={(value) =>
                userManagement.setFormData({
                  ...userManagement.formData,
                  status: value,
                })
              }
              options={[
                { value: "active", label: "활성" },
                { value: "inactive", label: "비활성" },
                { value: "suspended", label: "정지" },
              ]}
              label="상태"
              size="md"
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <FormInput
            name="title"
            value={postManagement.formData.title || ""}
            onChange={(value) =>
              postManagement.setFormData({
                ...postManagement.formData,
                title: value,
              })
            }
            label="제목"
            placeholder="게시글 제목을 입력하세요"
            required
            width="full"
            fieldType="postTitle"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <FormInput
              name="author"
              value={postManagement.formData.author || ""}
              onChange={(value) =>
                postManagement.setFormData({
                  ...postManagement.formData,
                  author: value,
                })
              }
              label="작성자"
              placeholder="작성자명"
              required
              width="full"
            />
            <FormSelect
              name="category"
              value={postManagement.formData.category || ""}
              onChange={(value) =>
                postManagement.setFormData({
                  ...postManagement.formData,
                  category: value,
                })
              }
              options={[
                { value: "development", label: "Development" },
                { value: "design", label: "Design" },
                { value: "accessibility", label: "Accessibility" },
              ]}
              label="카테고리"
              placeholder="카테고리 선택"
              size="md"
            />
          </div>
          <FormTextarea
            name="content"
            value={postManagement.formData.content || ""}
            onChange={(value) =>
              postManagement.setFormData({
                ...postManagement.formData,
                content: value,
              })
            }
            label="내용"
            placeholder="게시글 내용을 입력하세요"
            rows={6}
          />
        </>
      );
    }
  };

  // ===== 수정 모달 렌더링 =====
  const renderEditModalContent = () => {
    const selectedItem =
      entityType === "user"
        ? userManagement.selectedUser
        : postManagement.selectedPost;

    return (
      <div>
        {selectedItem && (
          <Alert variant="info">
            ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
            {entityType === "post" &&
              ` | 조회수: ${(selectedItem as Post).views}`}
          </Alert>
        )}

        {entityType === "user" ? renderUserEditForm() : renderPostEditForm()}
      </div>
    );
  };

  const renderUserEditForm = () => {
    return (
      <>
        <FormInput
          name="username"
          value={userManagement.formData.username || ""}
          onChange={(value) =>
            userManagement.setFormData({
              ...userManagement.formData,
              username: value,
            })
          }
          label="사용자명"
          placeholder="사용자명을 입력하세요"
          required
          width="full"
          fieldType="username"
        />
        <FormInput
          name="email"
          value={userManagement.formData.email || ""}
          onChange={(value) =>
            userManagement.setFormData({
              ...userManagement.formData,
              email: value,
            })
          }
          label="이메일"
          placeholder="이메일을 입력하세요"
          type="email"
          required
          width="full"
          fieldType="email"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <FormSelect
            name="role"
            value={userManagement.formData.role || "user"}
            onChange={(value) =>
              userManagement.setFormData({
                ...userManagement.formData,
                role: value,
              })
            }
            options={[
              { value: "user", label: "사용자" },
              { value: "moderator", label: "운영자" },
              { value: "admin", label: "관리자" },
            ]}
            label="역할"
            size="md"
          />
          <FormSelect
            name="status"
            value={userManagement.formData.status || "active"}
            onChange={(value) =>
              userManagement.setFormData({
                ...userManagement.formData,
                status: value,
              })
            }
            options={[
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
              { value: "suspended", label: "정지" },
            ]}
            label="상태"
            size="md"
          />
        </div>
      </>
    );
  };

  const renderPostEditForm = () => {
    return (
      <>
        <FormInput
          name="title"
          value={postManagement.formData.title || ""}
          onChange={(value) =>
            postManagement.setFormData({
              ...postManagement.formData,
              title: value,
            })
          }
          label="제목"
          placeholder="게시글 제목을 입력하세요"
          required
          width="full"
          fieldType="postTitle"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <FormInput
            name="author"
            value={postManagement.formData.author || ""}
            onChange={(value) =>
              postManagement.setFormData({
                ...postManagement.formData,
                author: value,
              })
            }
            label="작성자"
            placeholder="작성자명"
            required
            width="full"
          />
          <FormSelect
            name="category"
            value={postManagement.formData.category || ""}
            onChange={(value) =>
              postManagement.setFormData({
                ...postManagement.formData,
                category: value,
              })
            }
            options={[
              { value: "development", label: "Development" },
              { value: "design", label: "Design" },
              { value: "accessibility", label: "Accessibility" },
            ]}
            label="카테고리"
            placeholder="카테고리 선택"
            size="md"
          />
        </div>
        <FormTextarea
          name="content"
          value={postManagement.formData.content || ""}
          onChange={(value) =>
            postManagement.setFormData({
              ...postManagement.formData,
              content: value,
            })
          }
          label="내용"
          placeholder="게시글 내용을 입력하세요"
          rows={6}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5 ">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">관리 시스템</h1>
          <p className="text-sm text-gray-500">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="bg-white border border-gray-200 p-3 rounded-md">
          <EntityTypeSelector
            entityType={entityType}
            setEntityType={setEntityType}
          />
          <div>
            <div className="mb-4 text-right">
              <Button
                size="lg"
                onClick={() => currentManagement.setIsCreateModalOpen(true)}
              >
                새로 만들기
              </Button>
            </div>

            {currentManagement.showSuccessAlert && (
              <div style={{ marginBottom: "10px" }}>
                <Alert
                  variant="success"
                  title="성공"
                  onClose={() => currentManagement.setShowSuccessAlert(false)}
                >
                  {currentManagement.alertMessage}
                </Alert>
              </div>
            )}

            {currentManagement.showErrorAlert && (
              <div style={{ marginBottom: "10px" }}>
                <Alert
                  variant="error"
                  title="오류"
                  onClose={() => currentManagement.setShowErrorAlert(false)}
                >
                  {currentManagement.errorMessage}
                </Alert>
              </div>
            )}

            {entityType === "user" ? (
              <UserPage
                data={userManagement.users}
                onEdit={userManagement.handleEdit}
                onDelete={userManagement.handleDelete}
              />
            ) : (
              <PostPage
                data={postManagement.posts}
                onEdit={postManagement.handleEdit}
                onDelete={postManagement.handleDelete}
                onPublish={postManagement.handlePublish}
                onArchive={postManagement.handleArchive}
                onRestore={postManagement.handleRestore}
              />
            )}
          </div>
        </div>
      </div>

      {/* 생성 모달 */}
      <Modal
        isOpen={currentManagement.isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title={`새 ${entityType === "user" ? "사용자" : "게시글"} 만들기`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleCloseCreateModal}
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={
                entityType === "user"
                  ? userManagement.handleCreate
                  : postManagement.handleCreate
              }
            >
              생성
            </Button>
          </>
        }
      >
        <div>{renderCreateModalContent()}</div>
      </Modal>

      {/* 수정 모달 */}
      <Modal
        isOpen={currentManagement.isEditModalOpen}
        onClose={handleCloseEditModal}
        title={`${entityType === "user" ? "사용자" : "게시글"} 수정`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleCloseEditModal}
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={
                entityType === "user"
                  ? userManagement.handleUpdate
                  : postManagement.handleUpdate
              }
            >
              수정 완료
            </Button>
          </>
        }
      >
        {renderEditModalContent()}
      </Modal>
    </div>
  );
};
