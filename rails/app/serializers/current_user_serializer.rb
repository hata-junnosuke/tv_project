class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image, :created_at, :updated_at
end
