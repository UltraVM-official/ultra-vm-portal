
interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

export function PersonalInfo({ firstName, lastName, email, isAdmin }: PersonalInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-medium">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p>{firstName} {lastName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p>{email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Account Type</p>
          <p>{isAdmin ? 'Administrator' : 'User'}</p>
        </div>
      </div>
    </div>
  );
}
