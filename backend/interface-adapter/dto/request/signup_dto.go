package request

import (
	"go-todo-app/application/user"
	value_object "go-todo-app/domain/value-object"
)

// SignUp用のDTOと変換処理
type SignUpDTO struct {
	Name     string `json:"name" validate:"required"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func (dto *SignUpDTO) ToInput() (*user.SignUpParams, error) {
	name, err := value_object.NewName(dto.Name)
	if err != nil {
		return nil, err
	}
	email, err := value_object.NewEmail(dto.Email)
	if err != nil {
		return nil, err
	}
	hashedPassword, err := value_object.NewHashedPassword(dto.Password)
	if err != nil {
		return nil, err
	}

	return &user.SignUpParams{
		Name:           name,
		Email:          email,
		HashedPassword: hashedPassword,
	}, nil
}
