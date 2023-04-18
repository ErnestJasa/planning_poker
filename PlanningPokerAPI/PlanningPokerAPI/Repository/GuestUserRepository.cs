using PlanningPokerAPI.Data;
using PlanningPokerAPI.Interfaces;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Repository
{
    public class GuestUserRepository : IGuestUserRepository
    {
        public readonly DataContext _context;
        public GuestUserRepository(DataContext context)
        {
            _context = context;
        }

        public GuestUser Create(GuestUser guestUser)
        {
            _context.GuestUsers.Add(guestUser);
            guestUser.Id = _context.SaveChanges();
            return guestUser;
        }

        public bool Delete(string name)
        {
           var user = _context.GuestUsers.FirstOrDefault(x=> x.Name == name);
            if (user != null)
            {
                _context.GuestUsers.Remove(user);
            }                

           return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
